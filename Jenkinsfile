pipeline {
   agent any
   environment {
      GITHUB_REPO_URL = 'https://github.com/hongducdev/chat-app-backend.git'
      BRANCH_NAME = "${GIT_BRANCH.substring(GIT_BRANCH.lastIndexOf('/') + 1)}"
      PORT='4090'
      JWT_SECRET_KEY= 'your_secret_key'
      NODE_ENV='development'
   }
   stages{
      stage('Fetch repository') {
         steps {
            deleteDir()
            dir('DevopsChatApp') {
               script {
                  git branch: env.BRANCH_NAME, url: env.GITHUB_REPO_URL
               }
            }
         }
      }
      
      stage('Deploy in develop') {
         when {
            branch 'develop'
         }
         stages {
            stage('Clean up') {
               steps {
                  dir('DevopsChatApp') {
                     script {
                        echo("Code pushed or merged in branch ${env.BRANCH_NAME}")
                        sh 'sudo docker system prune -af'
                        sh 'sudo docker stop $(docker ps --filter status=running || exists -q) || true'
                        sh 'sudo docker rm $(docker ps -aq) || true'
                        sh 'sudo docker rmi $(docker images -q) || true'
                     }
                  }
               }
            }
            stage('Build and run') {
               steps {
                  dir('DevopsChatApp') {
                     script {
                        sh 'docker build -t chat-app-api .'
                        sh 'docker run -dp 4090:4090 chat-app-api'
                     }
                  }
               }
            }
         }

      }
      stage('Deploy in production') {
         when {
            branch 'main'
         }
         steps {
            dir('DevopsChatApp') {
               script {
                  echo("Code pushed or merged in branch ${env.BRANCH_NAME}")
                  sh '''ssh ec2-user@18.141.223.105 "bash ./kill_port.sh 4090 && sudo docker system prune -af && sudo docker stop $(docker ps --filter status=running -q) || true && sudo docker rm $(docker ps -aq) || true && sudo docker rmi $(docker images -q) || true && sudo rm -rf ./chat-app-backend && git clone $GITHUB_REPO_URL && cp .env ./chat-app-backend && cd chat-app-backend && docker login -u $USERNAME -p $PASSWORD && docker build -t $USERNAME/chat-app-api:latest -t $USERNAME/chat-app-api:2.1.$BUILD_NUMBER . && docker push $USERNAME/chat-app-api:latest && docker run -dp 4090:4090 $USERNAME/chat-app-api:2.1.$BUILD_NUMBER && docker logout"'''
               }
            }
         }
      }
   }
}

