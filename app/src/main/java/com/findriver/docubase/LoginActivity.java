package com.findriver.docubase;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.NestedScrollView;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.findriver.docubase.Class.User;
import com.findriver.docubase.Models.UserDatabaseHelper;
import com.findriver.docubase.Utils.InputValidation;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputLayout;

public class LoginActivity extends AppCompatActivity {
    private NestedScrollView nestedScrollView;
    private TextInputLayout layEmail;
    private TextInputLayout layPassword;
    private EditText inputEmail, inputPassword;
    private Button loginButton;
    private InputValidation inputValidation;
    private UserDatabaseHelper userDatabaseHelper;
    private User user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        this.initView();
        this.initListener();
        this.initObject();

        // Ajout d'un utilisateur par default pour le test
        User e = new User(1, "Hania", "Megri", "test@test.fr", "123", "Etudiant");
        User a = new User(2, "Admin", "Admin", "admin@admin.dz", "123", "Administrateur");
        userDatabaseHelper.addUser(e);
        userDatabaseHelper.addUser(a);
    }

    private void initView() {
        inputEmail = (EditText) findViewById(R.id.email);
        inputPassword = (EditText) findViewById(R.id.password);
        loginButton = (Button) findViewById(R.id.login);
        layEmail = (TextInputLayout) findViewById(R.id.emailError);
        layPassword = (TextInputLayout) findViewById(R.id.passwordError);
        nestedScrollView = (NestedScrollView) findViewById(R.id.nestedScrollView);
    }

    private void initListener() {
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String email = inputEmail.getText().toString();
                String password = inputPassword.getText().toString();

                verifyFromSqlite(email, password);
            }
        });
    }

    private void initObject() {
        inputValidation = new InputValidation(this);
        userDatabaseHelper = new UserDatabaseHelper(this);
    }

    private void verifyFromSqlite(String email, String password) {
        if (!inputValidation.isInputEditTextFilled(inputEmail, layEmail, getString(R.string.error_message_email))) {
            return;
        }
        if (!inputValidation.isInputEditTextEmail(inputEmail, layEmail, getString(R.string.error_message_email))) {
            return;
        }
        if (!inputValidation.isInputEditTextFilled(inputPassword, layPassword, getString(R.string.error_message_password))) {
            return;
        }
        if (userDatabaseHelper.checkUser(email, password)) {
            if (userDatabaseHelper.checkRole(email) == "Etudiant"){
                Intent intent = new Intent(this, EtudiantActivity.class);
                intent.putExtra("Email", email);
                this.startActivity(intent);
                Log.d("connexion","Etudiant");
            }
            if (userDatabaseHelper.checkRole(email) == "Enseignant"){
                Intent intent = new Intent(this, EnseignantActivity.class);
                intent.putExtra("Email", email);
                this.startActivity(intent);
                Log.d("connexion","Enseignant");
            }

            if (userDatabaseHelper.checkRole(email) == "Administrateur") {
                Intent intent = new Intent(LoginActivity.this, AdministrateurActivity.class);
                intent.putExtra("Email", email);
                this.startActivity(intent);
                Log.d("connexion","Administrateur");
            }
            resetInputEditText();


        } else {
            Snackbar.make(nestedScrollView, getString(R.string.error_valid_email_password), Snackbar.LENGTH_LONG).show();
        }
    }

    private void resetInputEditText() {
        inputEmail.setText(null);
        inputPassword.setText(null);
    }
}
