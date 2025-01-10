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
        stage('Setup Xvfb') {
            steps {
                echo 'Setting up Xvfb...'
                sh 'Xvfb :99 -ac &'
                sleep 5 
            }
        }

        stage('Checkout') {
            steps {
                git url: 'https://github.com/javiwasabi/Quiz1.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend Dependencies') {
                    steps {
                        dir('front-end') {
                            script {
                                if (fileExists('package.json')) {
                                    echo 'Installing frontend dependencies...'
                                    sh 'npm install --legacy-peer-deps   '
                                    sh 'npm install typescript --save-dev'
                                } else {
                                    error 'package.json no se encuentra en el directorio frontend.'
                                }
                            }
                        }
                    }
                }
                stage('Selenium Dependencies') {
                    steps {
                        dir('functional-tests/selenium') {
                            echo 'Installing selenium dependencies...'
                            sh 'npm cache clean --force'
                            sh 'npm install selenium-webdriver'
                            sh 'npm install chromedriver'
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                dir('front-end') {
                    echo 'Building frontend...'
                    sh 'npm start'
                }
            }
        }

        stage('Start Servers') {
            parallel {
                stage('Start Frontend Server') {
                    steps {
                        dir('frontend') {
                            echo 'Starting frontend server...'
                            sh 'nohup npm run start &'
                        }
                    }
                }
                stage('Start Backend Server') {
                    steps {
                        dir('back-end') {
                            echo 'Starting backend server...'
                            sh 'nohup npm run start &'
                        }
                    }
                }
            }
        }

        stage('Wait for Servers') {
            steps {
                echo 'Waiting for servers to start...'
                sleep 10
            }
        }

        stage('Run Cypress Tests') {
            steps {
                dir('frontend') {
                    echo 'Running Cypress tests...'
                    sh 'npx cypress run --config-file cypress.config.js --headless --browser electron'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Añade comandos específicos para tu despliegue aquí
            }
        }

        stage('Run Selenium Tests') {
            steps {
                dir('functional-tests/selenium') {
                    echo 'Running Selenium tests...'
                    sh 'npm cache clean --force'
                    sh 'node user-flow.test.js'
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
