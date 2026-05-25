FROM tomcat:10

COPY target/tic-tac-toe-1.0-SNAPSHOT.war /usr/local/tomcat/webapps/

EXPOSE 8080
