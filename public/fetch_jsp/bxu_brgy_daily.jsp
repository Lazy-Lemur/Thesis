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
//         String query  = "SELECT MAX(SUM) From(SELECT SUM(daily_"+request.getParameter("parameter")+") as sum FROM world_covid_data where date >= '"+request.getParameter("date1")+"' AND date <= '"+request.getParameter("date2")+"' GROUP BY country_name) z";
String query = "SELECT MAX(SUM) FROM(SELECT SUM("+request.getParameter("parameter")+") as sum FROM bxushapefile WHERE year = 2020 GROUP BY barangay) as foo";
rs = st.executeQuery(query);
ResultSetMetaData  meta = rs.getMetaData();
Integer columncount = meta.getColumnCount();
       %>
{"maximum":[
      <% while(rs.next()){ %>
	 {
            <% for (int i = 1 ; i<=columncount; i++)
          {
          %>
            <% if (i>1){%>,<% } %>
           "<%= meta.getColumnName(i)%>":"<%= rs.getString(meta.getColumnName(i))%>"
          <% } %>
	  }
	  <% if (!rs.isLast()){%>,<% } %>
	   <% } %>
	  ]}
	 
