pipeline {
    agent any
    environment {
        BACKEND_DIR = 'back-end'
        FRONTEND_DIR = 'front-end'
        TESTS_DIR = 'functional-tests'
    }
    stages {
        stage('Checkout Code') {
            steps {
                sh "echo 'Cloning repository...'"
                git branch: 'main', url: 'https://github.com/javiwasabi/Quiz1.git'
            }
        }
        stage('Install Dependencies and Build Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh "echo 'Installing backend dependencies...'"
                    sh "/usr/bin/npm install"
                }
            }
        }
        stage('Run Backend Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh "echo 'Running backend tests...'"
                    sh "/usr/bin/npm test"
                }
            }
        }
        stage('Install Dependencies and Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh "echo 'Installing frontend dependencies...'"
                    sh "/usr/bin/npm install"
                }
            }
        }
        stage('Run Frontend Tests') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh "echo 'Running frontend tests...'"
                    sh "/usr/bin/npm test"
                }
            }
        }
        stage('Deploy and Run Functional Tests') {
            steps {
                dir("${TESTS_DIR}") {
                    sh "echo 'Preparing for functional tests...'"
                    sh "/usr/bin/npm install"
                    sh "/usr/bin/npm test"
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
