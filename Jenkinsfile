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
                script {
                    // Inicia Docker Compose en segundo plano
                    bat 'start /B docker-compose up -d'

                    // Construye y asegura que los contenedores se construyan
                    bat 'docker-compose up --build'
                }
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Selenium Dependencies') {
                    steps {
                        dir('functional-tests/selenium') {
                            echo 'Installing selenium dependencies...'
                            bat 'npm cache clean --force'
                            bat 'npm install selenium-webdriver'
                            bat 'npm install chromedriver'
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Wait for Servers') {
            steps {
                echo 'Waiting for servers to start...'
                sleep 5
            }
        }

        stage('Run Selenium Tests') {
            steps {
                dir('functional-tests/selenium') {
                    echo 'Running Selenium tests...'
                    bat 'node user-flow.test.js'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            // slackSend(channel: '#proyecto', color: 'good', message: "Build exitoso :)")
        }
        failure {
            echo 'Pipeline failed.'
            // slackSend(channel: '#proyecto', color: 'danger', message: "Build fallido :(")
        }
    }
}
