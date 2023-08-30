pipeline {
    agent any
    environment{
        DOCKERHUB_CREDENTIALS = credentials('valaxy-dockerhub')
    }
    stages {
        stage('SCM Checkout') {
            steps{
                git 'https://github.com/KayrXa/Capstone-Frontend-React'
            }
        }

        stage('Build docker image') {
            steps{
                sh'docker build -t kayrxa/nodeapp:$BUILD_NUMBER .'
            }
        }

        stage('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('push image'){
            steps{
                sh 'docker push kayrxa/nodeapp:$BUILD_NUMBER'
            }
        }



    }



}