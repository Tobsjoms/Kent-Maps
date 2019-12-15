
<?php include 'lilo-prefix.php'; ?>

<?php displayMessages() ?>

<form action="?" method="post">

    <div class="group">      
        <input id="email-input" name="email" type="text" autocapitalize="off" spellcheck="false" required>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="email-input">Email</label>
    </div>

    <div class="group">      
        <input id="password-input" name="password" type="password" autocapitalize="off" spellcheck="false" required>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="password-input">Password</label>
    </div>

	<input class="button enabled" id="submit-button" type="submit" name="submit" value="Log In"/>
</form>

<?php include 'lilo-suffix.php'; ?>