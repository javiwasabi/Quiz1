pipeline {
    agent any
    environment {
        NODE_ENV = 'test'
    }
    stages {
        stage('Setup Backend') {
            steps {
                dir('back-end') {
                    script {
                        
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Run Backend Tests') {
            steps {
                dir('back-end/tests') {
                    script {
               
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Setup Frontend') {
            steps {
                dir('front-end') {
                    script {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Run Frontend Tests') {
            steps {
                dir('front-end/src/tests') {
                    script {
                        // Ejecutar los tests unitarios del frontend
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Setup Functional Tests') {
            steps {
                dir('functional-tests') {
                    script {

                        sh 'npm install'
                    }
                }
            }
        }
        stage('Run Functional Tests') {
            steps {
                dir('functional-tests/selenium') {
                    script {
                        sh 'node user-flow.test.js '
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'All tests passed successfully!'
        }
        failure {
            echo 'Some tests failed. Check the logs for details.'
        }
    }
}
