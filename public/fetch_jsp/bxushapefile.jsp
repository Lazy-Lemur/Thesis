<%@ page import="java.sql.*" %>

       <%
	   
String driver = "org.postgresql.Driver";
String url = "jdbc:postgresql://127.0.0.1:5432/bxushapefile";
String username = "postgres";
String password = "admin";
Connection myConnection = null;
PreparedStatement myPreparedStatement = null;
ResultSet myResultSet = null;
Class.forName(driver).newInstance();
myConnection = DriverManager.getConnection(url,username,password);
Statement st;
ResultSet rs;
st = myConnection.createStatement();
         String query  = "SELECT st_asgeojson(geom) from bxushapefile";

          rs = st.executeQuery(query) ;
		ResultSetMetaData  meta = rs.getMetaData();
Integer columncount = meta.getColumnCount();
       %>
     {"type":"FeatureCollection",
 "features":[
      <% while(rs.next()){ %>
	  {"type":"Feature",
  "geometry":<%= rs.getString("st_asgeojson")%>,
   "properties":{
  <% for (int i = 1 ; i<=columncount; i++)
{
if(!meta.getColumnName(i).equals("st_asgeojson"))
{
%>
 <% if (i>1){%>,<% } %>
"<%= meta.getColumnName(i)%>":"<%= rs.getString(meta.getColumnName(i))%>"
    <% }} %>
	  }}
	  <% if (!rs.isLast()){%>,<% } %>
	   <% } %>
	  ]}
	 
     
   

