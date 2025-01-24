pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = 'mo0'
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
                echo 'Starting Docker Compose services in background...'
                script {
                    bat 'docker-compose down'
                    bat 'start /B docker-compose up -d'  
             
                }
            }
        }

        stage('Wait for Servers') {
            steps {
                echo 'Waiting for servers to start...'
                sleep 5  // Tiempo de espera para que los servidores estén listos
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

        stage('Run Selenium Tests') {
            steps {
                dir('functional-tests/selenium') {
                    echo 'Running Selenium tests...'
                    bat 'node user-flow.test.js'
                }
            }
        }
        
        stage('Closing Docker') {
            steps {
                echo 'Closing Docker Compose services ... '
                script {
                    bat 'docker-compose down'
             
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
