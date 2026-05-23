# Use Tomcat 10 with Java 21 as the base environment
FROM tomcat:10.1-jdk21

# Clean out default Tomcat apps to prevent route conflicts
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy your built war file and rename it to ROOT.war
# This lets your friend load the game at the main domain without typing /puzzle/
COPY target/photo-puzzle.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
