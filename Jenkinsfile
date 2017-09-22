pipeline {
  agent any
  stages {
    stage('Preparation') {
      steps {
        git(url: 'https://github.com/nyanim/nyanfm-node.git', branch: 'master')
      }
    }
    
    stage('Build') {
      steps {
        sh 'docker build -t nyanim/nyanfm:latest .'
      }
    }
    parallel(
      "Push" : {
        stage('Push') {
          steps {
            sh '''docker login -u=$DOCKER_USERNAME -p=$DOCKER_PASSWORD
docker push nyanim/nyanfm:latest'''
          }
        }
      }
      "Deploy":{
        stage('Deploy') {
          steps{
            sshagent(['3a402fd8-ef4f-49fd-a83c-76a114a06b6c']) {
              sh '''
                ssh -o StrictHostKeyChecking=no -l frank guoduhao.cn <<EOF 
                sudo docker-compose -f /home/frank/dockers/nyanfm.yml down
                sudo docker-compose -f /home/frank/dockers/nyanfm.yml up -d 
                uname -a
              '''
            }
          }
        }
      }
    )
    
    stage('Notification'){
      steps{
          emailext body: '''$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:

Check console output at $BUILD_URL to view the results.''', recipientProviders: [[$class: 'DevelopersRecipientProvider']], replyTo: 'i@nyan.im', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'i@nyan.im'

      }
    }
  }
}