package com.findriver.docubase;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.NavigationUI;

import android.os.Bundle;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class AdministrateurActivity extends AppCompatActivity {
    private BottomNavigationView bottomNavifationView;
    private NavController navController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_administrateur);

        init();

        NavigationUI.setupWithNavController(bottomNavifationView, navController);


    }

    public void init(){
        bottomNavifationView = findViewById(R.id.bottomNavigationView);
        navController = Navigation.findNavController(this, R.id.nav_host_fragment_container);
    }
}
