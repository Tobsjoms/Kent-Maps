
<?php 
	include 'lilo-prefix.php';
	displayMessages();

	$url = $_SESSION['timetable_url'];
	$col = $_SESSION['colour_scheme'];
?>

<form action="?" method="post">

    <div class="group">      
        <input id="timetable-url-input" name="timetable-url" type="text" autocapitalize="off" spellcheck="false" <?php if (isset($url)) echo 'value="' . $url . '"'; ?>>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="timetable-url-input">Timetable URL</label>
    </div>

    <div class="group">      
		<select id="colour-scheme-input" name="colour-scheme">
		  <option <?php if (isset($col) && $col == "default") echo "selected" ?> value="default">Default</option>
		  <option <?php if (isset($col) && $col == "darkmode") echo "selected" ?> value="darkmode">Dark Mode</option>
		  <option <?php if (isset($col) && $col == "colourblindmode") echo "selected" ?> value="colourblindmode">Colour Blind Mode</option>
		</select>
    </div>

	<input class="button enabled" id="submit-button" type="submit" name="submit" value="Save Changes"/>
</form>

<a href="index.php" class="alternate-lilo">Discard Changes</a>

<?php include 'lilo-suffix.php'; ?>