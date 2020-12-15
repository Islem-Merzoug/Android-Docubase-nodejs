package com.findriver.docubase.Class;

public class Etudiant extends User {
    private String specialty;
    private String group;

    public Etudiant(int id, String firstname, String lastname, String email, String password, String role, String specialty, String group) {
        super(id, firstname, lastname, email, password, role);
        this.specialty = specialty;
        this.group = group;
    }

    public String getSpecialty() { return specialty; }

    public String getGroup() { return group; }
}
