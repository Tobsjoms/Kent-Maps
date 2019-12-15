
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

	<span class="note warning clearfix" id="password-note">Passwords must include lowercase, uppercase and numerical characters.</span>
	<input class="button" id="submit-button" type="submit" name="submit" value="Sign Up" disabled/>
</form>

<script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.2.0/zxcvbn.js"></script>
<script>

	var submitButton = document.getElementById('submit-button');
	var password = document.getElementById('password-input');
	var passwordNote = document.getElementById('password-note');
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

	password.addEventListener('input', function() {

		if(re.test(password.value)){
			submitButton.className = "button enabled";
			submitButton.disabled = false;
			passwordNote.className = "note calm";
		}
		else{
			submitButton.className = "button";
			submitButton.disabled = true;
			passwordNote.className = "note triggered";
		}
	});

</script>

<?php include 'lilo-suffix.php'; ?>