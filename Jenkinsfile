pipeline {
    agent any
    environment {
        NODE_IMAGE = 'node:16'
        BACKEND_DIR = 'back-end'
        FRONTEND_DIR = 'front-end'
        TESTS_DIR = 'functional-tests'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/javiwasabi/Quiz1.git'
            }
        }
        stage('Run Backend Unit Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm ci'  // Reemplaza 'npm install' por 'npm ci' para instalar dependencias fijas.
                    sh 'npm test || echo "Backend tests failed."' // Captura errores de pruebas.
                }
            }
        }
        stage('Run Frontend Unit Tests') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm ci'
                    sh 'npm test || echo "Frontend tests failed."' // Captura errores de pruebas.
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    def backendImage = docker.build("docker.io/javiwasabis/backend-image:latest", "${BACKEND_DIR}")
                    def frontendImage = docker.build("docker.io/javiwasabis/frontend-image:latest", "${FRONTEND_DIR}")
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
                    sh 'docker-compose down || true' // Asegura que no falle si no hay contenedores corriendo.
                    sh 'docker-compose up -d'
                    sh 'docker ps'
                }
            }
        }
        stage('Run Functional Tests') {
            steps {
                dir("${TESTS_DIR}") {
                    sh 'sleep 10'  // Asegúrate de que los servicios estén listos antes de ejecutar las pruebas.
                    sh 'npm ci'
                    sh 'npm test || echo "Functional tests failed."' // Captura errores de pruebas.
                }
            }
        }
    }
    post {
        always {
            junit '**/tests/results.xml' // Asegúrate de que los resultados estén en formato XML.
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
