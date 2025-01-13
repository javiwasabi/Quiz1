pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = 'mongodb://mongo:27017/quiz'
        PATH = "$PATH:/usr/local/bin"
        DOCKER_NETWORK = 'mern_network'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git url: 'https://github.com/javiwasabi/Quiz1.git', branch: 'main'
            }
        }

        stage('Build and Start Services') {
            steps {
                echo 'Building and starting services with docker-compose...'
                script {
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                }
            }
        }

        stage('Wait for Services') {
            steps {
                echo 'Waiting for services to be ready...'
                sleep 10 // Esperar para que los servicios estén completamente operativos
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('back-end') {
                    echo 'Running backend tests...'
                    sh 'docker exec $(docker ps -qf "name=backend") npm test'
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

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
        always {
            echo 'Cleaning up resources...'
            sh 'docker-compose -f docker-compose.yml down'
        }
    }
}
