pipeline {
   agent any
   environment {
      GITHUB_REPO_URL = 'https://github.com/hongducdev/chat-app-backend.git'
   }
   stages{
      stage('checkout') {
         steps {
            checkout scm
         }
      }
      // Connect github and branch
      stage('Check branch') {
         steps {
            script {
               if (env.BRANCH_NAME == 'main') {
                  echo "Branch ${env.BRANCH_NAME}"
                  // stage('Cleanup') {
                  //    steps {
                  //       deleteDir()
                  //       dir('DevopsChatApp') {
                  //          script {
                  //             sh 'sudo docker system -af'
                  //             sh 'sudo docker stop $(docker ps --filter status=running || exists -q) || true && sudo docker rm $(docker ps -aq) || true && sudo docker rmi $(docker images -q) || true'
                  //          }
                  //       }
                  //    }
                  // }
                  // stage('Clone repository') {
                  //    steps {
                  //       dir('DevopsChatApp') {
                  //          script {
                  //             git branch: env.BRANCH_NAME, url: env.GITHUB_REPO_URL
                  //          }
                  //       }
                  //    }
                  // }
                  // stage('Login docker') {
                  //    steps {
                  //       dir('DevopsChatApp') {
                  //          script {
                  //             sh 'docker login -u $USERNAME -p $PASSWORD'
                  //          }
                  //       }
                  //    }
                  // }
                  // stage('Docker build and push') {
                  //    steps {
                  //       dir('DevopsChatApp') {
                  //          script {
                  //             sh 'docker build -t $USERNAME/chat-app-api:latest -t $USERNAME/chat-app-api:$BUILD_NUMBER .'
                  //             sh 'docker push $USERNAME/chat-app-api:latest $USERNAME/chat-app-api:$BUILD_NUMBER'
                  //             sh 'docker run -dp 4090:4090 $USERNAME/chat-app-api:$BUILD_NUMBER'
                  //             sh 'docker logout'
                  //          }
                  //       }
                  //    }
                  // }
               } else if (env.BRANCH_NAME == 'develop'){
                  echo("Branch ${env.BRANCH_NAME}")
                  // stage('Cleanup') {
                  //    steps {
                  //       deleteDir()
                  //       dir('DevopsChatApp') {
                  //          script {
                  //             sh 'sudo docker system -af'
                  //             sh 'sudo docker stop $(docker ps --filter status=running || exists -q) || true && sudo docker rm $(docker ps -aq) || true && sudo docker rmi $(docker images -q) || true'
                  //          }
                  //       }
                  //    }
                  // }
                  // stage('Clone repository') {
                  //    steps {
                  //       dir('DevopsChatApp') {
                  //          script {
                  //             git branch: env.BRANCH_NAME, url: env.GITHUB_REPO_URL
                  //          }
                  //       }
                  //    }
                  // }
                  // stage('Docker build and run in local') {
                  //    steps {
                  //       dir('DevopsChatApp') {
                  //          script {
                  //             sh 'docker build chat-app-api .'
                  //             sh 'docker run -dp 4090:4090 chat-app-api'
                  //          }
                  //       }
                  //    }
                  // }
               } else {
                  echo("${env.BRANCH_NAME} is not supported")
               }
            }
         }
      }
   }
}
