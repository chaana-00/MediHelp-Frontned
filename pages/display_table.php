<?php
// Database connection
$conn = new mysqli("localhost", "root", "1234", "medihelpdb");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the data from the database
$sql = "SELECT * FROM contact_form";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Form Submissions</title>
</head>
<body>
    <h2>Contact Form Submissions</h2>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr><td>".$row["id"]."</td><td>".$row["name"]."</td><td>".$row["email"]."</td><td>".$row["subject"]."</td><td>".$row["message"]."</td></tr>";
            }
        } else {
            echo "<tr><td colspan='5'>No results found</td></tr>";
        }
        $conn->close();
        ?>
    </table>
</body>
</html>
