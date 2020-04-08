
<?php include 'lilo-prefix.php'; ?>

<?php displayMessages() ?>

<form action="?" method="post">
	<input type="hidden" name="key" value="<?=$key?>" required/>
    <div class="group">      
        <div class="group">      
        <input id="password-input" name="password" type="password" autocapitalize="off" spellcheck="false" required>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="email-input">New Password</label>
    </div>
	<input class="button enabled" id="submit-button" type="submit" name="submit-new-pass" value="Change Password"/>
</form>

<script>

	var submitButton = document.getElementById('submit-button');
	var password = document.getElementById('password-input');
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

	password.addEventListener('input', function() {

		if(re.test(password.value)){
			submitButton.disabled = false;
			password.className = "good";
		}
		else{
			submitButton.disabled = true;
			password.className = "bad";
		}
	});

</script>

</br>
<a href="login.php" class="alternate-lilo">Already know your password?</a>
<a href="signup.php" class="alternate-lilo">Don't have an account?</a>

<?php include 'lilo-suffix.php'; ?>
