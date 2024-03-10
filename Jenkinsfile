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
      stage('Checkout SCM') {
         steps {
            checkout scm
         }
      }
      stage('Cleanup dir') {
         steps {
            deleteDir()
         }
      }
      stage('Fetch repository') {
         steps {
            dir('DevopsChatApp') {
               script {
                  // env.BRANCH_NAME = env.GIT_BRANCH.substring(env.GIT_BRANCH.lastIndexOf('/') + 1)
                  git branch: env.BRANCH_NAME, url: env.GITHUB_REPO_URL
               }
            }
         }
      }
      stage('Deploy in production environment') {
         when {
            branch 'main'
         }
         stages {
            stage('Cleanup docker') {
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
            stage('SSH to deploy server') {
               steps {
                  dir('DevopsChatApp') {
                     script {
                        sh 'ssh ec2-user@52.76.143.176'
                        sh 'ssh ec2-user@52.76.143.176 "ls -a"'
                     }
                  }
               }
            }
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
         }
      }
      stage('Deploy in develop environment') {
         when {
            branch 'develop'
         }
         stages {
            stage('Cleanup docker') {
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
            stage('Docker build and run in local') {
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
   }
}
