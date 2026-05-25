pipeline {
    agent any

    tools {
        maven 'Maven'
        jdk 'JDK21'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sharanya21-ai/tictactoe.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                // Removed 'sudo'. This copies the war file directly and renames it to tictactoe.war
                sh 'cp target/tictactoe.war /var/lib/tomcat10/webapps/tictactoe.war'
            }
        }
    }

    post {
        success {
            emailext(
                subject: "SUCCESS: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """
Build Successful!

Tic Tac Toe deployed successfully to your local Tomcat server.

Play the game here:
http://localhost:8080/tictactoe/
""",
                to: 'sharanyajagannath214@gmail.com'
            )
        }

        failure {
            emailext(
                subject: "FAILED: ${JOB_NAME} #${BUILD_NUMBER}",
                body: 'Build Failed! Please check the Jenkins console logs to find the issue.',
                to: 'sharanyajagannath214@gmail.com'
            )
        }
    }
}
