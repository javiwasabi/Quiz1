pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = 'mongodb+srv://javiwasabi:bhu8nji9@cluster0.t7nmc.mongodb.net/InternshipDB?retryWrites=true&w=majority&appName=Cluster0'
        DISPLAY = ':99'
        PATH = "$PATH:/usr/local/bin"
        XDG_RUNTIME_DIR = '/tmp/runtime-jenkins'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/javiwasabi/Quiz1.git', branch: 'main'
            }
        }

        stage('Start Docker Compose') {
            steps {
                echo 'Starting Docker Compose services...'
                bat 'docker-compose -f docker-compose.yml up -d'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend Dependencies') {
                    steps {
                        echo 'Installing frontend dependencies...'
                        bat 'docker exec $(docker-compose ps -q frontend) npm install --legacy-peer-deps'
                    }
                }
                stage('Backend Dependencies') {
                    steps {
                        echo 'Installing backend dependencies...'
                        bat 'docker exec $(docker-compose ps -q backend) npm install'
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Run Backend Tests') {
                    steps {
                        echo 'Running backend tests...'
                        bat 'docker exec $(docker-compose ps -q backend) npm test'
                    }
                }
                stage('Run Selenium Tests') {
                    steps {
                        echo 'Running Selenium tests...'
                        bat 'docker exec $(docker-compose ps -q frontend) node user-flow.test.js'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker Compose services...'
            bat 'docker-compose -f docker-compose.yml down'
        }
    }
}

