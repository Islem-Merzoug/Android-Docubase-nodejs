package com.findriver.docubase;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.findriver.docubase.Class.Etudiant;
import com.findriver.docubase.Class.User;
import com.findriver.docubase.Models.EtudiantDatabaseHelper;
import com.findriver.docubase.Models.UserDatabaseHelper;

public class EtudiantActivity extends AppCompatActivity {

    private EtudiantDatabaseHelper etudiantDatabaseHelper;
    private TextView welcomeWithName;
    private Etudiant etudiant;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_etudiant);

        this.initView();
        this.initListener();
        this.initObject();

        welcomeWithName.setText("Bienvenue " + etudiant.getRole());
    }

    private void initView() {
        welcomeWithName = (TextView) findViewById(R.id.WelcomeWithName);
    }

    private void initObject() {
        etudiantDatabaseHelper = new EtudiantDatabaseHelper(this);
        etudiant = etudiantDatabaseHelper.getEtudiant(getIntent().getExtras().getString("Email"));
    }

    private void initListener() {

    }
}
