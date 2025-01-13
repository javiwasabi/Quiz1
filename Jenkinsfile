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
                sh 'docker-compose -f docker-compose.yml up -d'
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
                                    sh 'npm install --legacy-peer-deps'
                                    sh 'npm install typescript --save-dev'
                                    sh 'npm install @babel/plugin-proposal-private-property-in-object --save-dev'
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
                stage('Backend Dependencies') {
                    steps {
                        dir('back-end') {
                            echo 'Installing backend dependencies...'
                            sh 'npm install'
                            sh 'npm install --save-dev supertest'
                            sh 'npm install -g supertest'
                        }
                    }
                }
            }
        }

        stage('Install Jest for Back-end') {
            steps {
                dir('back-end') {
                    echo 'Installing Jest for back-end tests...'
                    sh 'npm install --save-dev jest'
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Run Backend Tests') {
                    steps {
                        dir('back-end') {
                            echo 'Running backend tests...'
                            sh 'npm test'
                        }
                    }
                }
                stage('Run Selenium Tests') {
                    steps {
                        dir('functional-tests/selenium') {
                            echo 'Running Selenium tests...'
                            sh 'node user-flow.test.js'
                        }
                    }
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
        always {
            echo 'Cleaning up Docker Compose services...'
            sh 'docker-compose -f docker-compose.yml down'
        }
    }
}
