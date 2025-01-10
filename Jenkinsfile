pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = 'mongodb+srv://javiwasabi:bhu8nji9@cluster0.t7nmc.mongodb.net/InternshipDB?retryWrites=true&w=majority&appName=Cluster0'
        DISPLAY = ':99' // Necesario para ejecutar Chrome sin un servidor gráfico
        PATH = "$PATH:/usr/local/bin" // Incluye la ruta de ChromeDriver
        XDG_RUNTIME_DIR = '/tmp/runtime-jenkins' // Necesario para Chrome en Jenkins
    }

    stages {
        stage('Setup Xvfb') {
            steps {
                echo 'Setting up Xvfb...'
                sh 'Xvfb :99 -ac &'
            }
        }

        stage('Checkout') {
            steps {
                git url: 'https://github.com/javiwasabi/Quiz1.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend/src') {
                    echo 'Installing frontend dependencies...'
                    sh 'npm install'
                }
                dir('functional-tests/selenium') {
                    echo 'Installing selenium dependencies...'
                    // Asegúrate de instalar selenium-webdriver globalmente para Jenkins
                    sh 'npm install selenium-webdriver'
                    sh 'npm install chromedriver'
                    sh 'npm i'
                    sh 'node user-flowt.test.js '
                }
            }
        }

        stage('Build') {
            steps {
                dir('frontend') {
                    echo 'Building frontend...'
                    sh 'npm run build'
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
                        dir('backend') {
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
                sleep 10 // Ajusta el tiempo si es necesario
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress tests...'
                sh 'npx cypress run --config-file cypress.config.js --headless --browser electron'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Aquí puedes agregar los comandos necesarios para desplegar tu aplicación
            }
        }

        stage('Run Selenium Tests') {
            steps {
                dir('selenium') {
                    echo 'Running Selenium tests...'
                    // Limpia el caché de npm por seguridad
                    sh 'npm cache clean --force'
                    // Ejecuta los tests asegurándote de que se use el entorno configurado
                    sh 'node runner.js'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            slackSend(channel: '#proyecto', color: 'good', message: "Build exitoso :)")
        }
        failure {
            echo 'Pipeline failed.'
            slackSend(channel: '#proyecto', color: 'danger', message: "Build fallido :(")
        }
    }
}