pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'docker.io/javiwasabis'
        NODE_IMAGE = 'node:16' 
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/javiwasabi/Quiz1.git'
            }
        }
        stage('Run Backend Unit Tests') {
            steps {
                script {
                    docker.image(NODE_IMAGE).inside {
                        dir('back-end') {
                            sh 'npm install'
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        stage('Run Frontend Unit Tests') {
            steps {
                script {
                    docker.image(NODE_IMAGE).inside {
                        dir('front-end') {
                            sh 'npm install'
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    def backendImage = docker.build("${DOCKER_REGISTRY}/backend-image:latest", './back-end')
                    def frontendImage = docker.build("${DOCKER_REGISTRY}/frontend-image:latest", './front-end')
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        backendImage.push()
                        frontendImage.push()
                    }
                }
            }
        }
        stage('Deploy Containers') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
                sh 'docker ps'
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
            junit 'back-end/tests/results.xml'
            junit 'front-end/tests/results.xml'
            junit 'functional-tests/results.xml'
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
