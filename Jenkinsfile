pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/nyanim/nyanfm-node.git', branch: 'master')
      }
    }
    
    stage('Build') {
      steps {
        sh 'docker build -t nyanim/nyanfm:latest .'
      }
    }

    stage('Push') {
      steps {
        parallel(
          "Push" : {
            sh '''
            docker login -u=$DOCKER_USERNAME -p=$DOCKER_PASSWORD
            docker push nyanim/nyanfm:latest
            '''
          },
          "Deploy":{
            sh '''
              sshpass -p $SSH_PASSWORD ssh -o StrictHostKeyChecking=no -l frank guoduhao.cn <<EOF 
              sudo docker-compose -f /home/frank/dockers/nyanfm.yml down
              sudo docker-compose -f /home/frank/dockers/nyanfm.yml up -d 
              uname -a
            '''
          }
        )
      }
    }
    
    stage('Notification'){
      steps{
          emailext body: '''$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:

Check console output at $BUILD_URL to view the results.''', recipientProviders: [[$class: 'DevelopersRecipientProvider']], replyTo: 'i@nyan.im', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'i@nyan.im'

      }
    }
  }
}