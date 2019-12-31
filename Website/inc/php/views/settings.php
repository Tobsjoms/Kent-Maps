
<?php include 'lilo-prefix.php'; ?>

<?php displayMessages() ?>

<form action="?" method="post">

    <div class="group">      
        <input id="timetable-url-input" name="timetable-url" type="text" autocapitalize="off" spellcheck="false" required>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="timetable-url-input">Timetable URL</label>
    </div>

	<input class="button enabled" id="submit-button" type="submit" name="submit" value="Save Settings"/>
</form>

<?php include 'lilo-suffix.php'; ?>