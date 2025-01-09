pipeline {
    agent any
    environment {
        NODE_IMAGE = 'node:16'  y
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/javiwasabi/Quiz1.git'
            }
        }
        stage('Run Backend Unit Tests') {
            steps {
                dir('back-end') {
                    sh 'npm install'
                    sh 'npm test' 
                }
            }
        }
        stage('Run Frontend Unit Tests') {
            steps {
                dir('front-end') {
                    sh 'npm install'
                    sh 'npm test'  // Ejecuta las pruebas directamente sin Docker
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    def backendImage = docker.build("docker.io/javiwasabis/backend-image:latest", './back-end')
                    def frontendImage = docker.build("docker.io/javiwasabis/frontend-image:latest", './front-end')
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        backendImage.push()
                        frontendImage.push()
                    }
                }
            }
        }
        stage('Deploy Containers') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                    sh 'docker ps' 
                }
            }
        }
        stage('Run Functional Tests') {
            steps {
                dir('functional-tests') {
                    sh 'sleep 10'
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
    }
    post {
        always {
            junit '**/tests/results.xml'  // Asegúrate de tener los resultados en un archivo XML para poder reportarlos
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
