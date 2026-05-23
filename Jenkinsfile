pipeline {
    agent any

    tools {
        maven 'Maven'
        jdk 'JDK21'
    }

    environment {
        // Hardcoded your specific Docker Hub profile details
        DOCKER_HUB_USER = 'hrishi2104'
        IMAGE_NAME      = 'photo-puzzle'
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                // This binds your secure Jenkins credentials to environment variables
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                    
                    // 1. Securely log into your Docker Hub account
                    sh "echo ${REGISTRY_PASS} | docker login -u ${REGISTRY_USER} --password-stdin"
                    
                    // 2. Build the image with a unique build number tag and a 'latest' tag
                    sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                    sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest ."
                    
                    // 3. Push both versions up to Docker Hub so your friend can see them
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            // Cleans up local image cache on your laptop to prevent running out of disk space
            sh "docker rmi -f ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} || true"
            sh "docker rmi -f ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest || true"
        }
        success {
            emailext (
                subject: "SUCCESS: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """
Build & Push Successful!

Your Photo Puzzle Game has been pushed to Docker Hub under:
${DOCKER_HUB_USER}/${IMAGE_NAME}:latest

Your friend can pull and run it using:
docker run -d -p 8085:8080 ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest
""",
                to: "djhrishikesh2003@gmail.com"
            )
        }
        failure {
            emailext (
                subject: "FAILED: ${JOB_NAME} #${BUILD_NUMBER}",
                body: "Build Failed! Check the Jenkins console logs to find out why the Docker steps failed.",
                to: "djhrishikesh2003@gmail.com"
            )
        }
    }
}
