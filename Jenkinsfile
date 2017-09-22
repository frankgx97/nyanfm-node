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
        sh 'docker build -t nyanim/nyanfm .'
      }
    }
    stage('Push') {
      steps {
        sh 'docker push nyanim/nyanfm'
      }
    }
  }
}