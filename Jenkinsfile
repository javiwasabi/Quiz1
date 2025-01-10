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

        stage('Install Dependencies') {
            parallel {
                stage('Frontend Dependencies') {
                    steps {
                        dir('front-end') {
                            script {
                                if (fileExists('package.json')) {
                                    echo 'Installing frontend dependencies...'
                                    bat 'npm install --legacy-peer-deps'
                                    bat 'npm install typescript --save-dev'
                                    bat 'npm install @babel/plugin-proposal-private-property-in-object --save-dev'
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
                            bat 'npm cache clean --force'
                            bat 'npm install selenium-webdriver'
                            bat 'npm install chromedriver'
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Install Jest for Back-end') {
            steps {
                dir('back-end') {
                    echo 'Installing Jest for back-end tests...'
                    bat 'npm install --save-dev jest'
                    bat 'npx jest'
          

                }
            }
        }

        stage('Start Servers') {
            parallel {
                stage('Start Frontend Server') {
                    steps {
                        dir('front-end') {
                            echo 'Starting frontend server in the background...'
                            bat 'start /B npm run start'
                        }
                    }
                }
                stage('Start Backend Server') {
                    steps {
                        dir('back-end') {
                            echo 'Starting backend server in the background...'
                            bat 'start /B npm run start'
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

        stage('Run Unit Tests Front-end') {
            steps {
                dir('front-end/src/tests/components') {
                    echo 'Running front-end Unit tests...'
                    bat 'npm test -- --passWithNoTests --testPathPattern=src/tests/components'
                }
            }
        }

        stage('Run Unit Tests Back-end') {
            steps {
                dir('back-end') {
                    echo 'Running back-end Unit tests...'
                    bat 'npm test'
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
