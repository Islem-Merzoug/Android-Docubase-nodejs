package com.findriver.docubase.Class;

import androidx.annotation.Nullable;

import java.lang.reflect.Array;
import java.util.Arrays;

public class User {
    private int id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;

    private String[] roles = {"Etudiant", "Enseignant", "Administrateur"};

    public User(int id, String firstname, String lastname, String email, String password, String role) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        if (checkRole(this.roles, role)) {
            this.role = role;
        } else {
            this.role = "Etudiant";
        }
    }

    private boolean checkRole(String[] roles, String role) {
        for (String cursor: roles) {
            if (cursor.equals(role)) return true;
        }
        return false;
    }

    public int getId() { return this.id; }

    public String getFirstname() { return this.firstname; }

    public String getLastname() { return this.lastname; }

    public String getEmail() { return this.email; }

    public String getPassword() { return this.password; }

    public String getRole() { return this.role; }
}
