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
                bat 'docker-compose up --build'
            }
        }


        stage('Run Tests') {
            parallel {
                stage('Run Backend Tests') {
                    steps {
                        script {
                            def backendContainerId = bat(script: "docker-compose ps -q backend", returnStdout: true).trim()
                            if (backendContainerId) {
                                echo 'Running backend tests...'
                                bat "docker exec ${backendContainerId} npm test"
                            } else {
                                error 'Backend container not found for testing.'
                            }
                        }
                    }
                }
                stage('Run Selenium Tests') {
                    steps {
                        script {
                            def frontendContainerId = bat(script: "docker-compose ps -q frontend", returnStdout: true).trim()
                            if (frontendContainerId) {
                                echo 'Running Selenium tests...'
                                bat "docker exec ${frontendContainerId} node user-flow.test.js"
                            } else {
                                error 'Frontend container not found for Selenium tests.'
                            }
                        }
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
