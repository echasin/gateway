#REM Batch Deploy

#START Jhipster Registry in Blue Window with title
START  color 1F ^&^& cd D:\Github\apprefactory\jhipster-registry ^&^&  title Jhipster Registry ^&^& mvnw 
timeout /t 1

#START Gateway in Agua Window with title
START color 3F ^&^& cd D:\Github\apprefactory\gateway ^&^& title Gateway ^&^&  gradlew -Pprod ^&^& title Gateway

#START Asset in Red Window with title
START color 4F ^&^& cd D:\Github\apprefactory\asset ^&^& title Asset ^&^&  gradlew -Pprod ^&^& title Asset
