
<?php include 'lilo-prefix.php'; ?>

<?php displayMessages() ?>

<form action="?" method="post">

    <div class="group">      
        <input id="email-input" name="email" type="text" autocapitalize="off" spellcheck="false" required>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="email-input">Email</label>
    </div>

	<input class="button enabled" id="submit-button" type="submit" name="submit-email" value="Send Reset Email"/>
</form>

<a href="login.php" class="alternate-lilo">I know my password</a>
<a href="signup.php" class="alternate-lilo">Don't have an account?</a>

<?php include 'lilo-suffix.php'; ?>