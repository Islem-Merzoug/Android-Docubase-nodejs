package com.findriver.docubase.Models;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

import com.findriver.docubase.Class.Etudiant;

public class EtudiantDatabaseHelper extends SQLiteOpenHelper {

    private static final int DATABASE_VERSION = 2;
    private static final String DATABASE_NAME = "docubase";

    private String CREATE_USER_TABLE = "CREATE TABLE etudiants (" +
            "id INT PRIMARY KEY," +
            "specialty varchar(50)," +
            "etudiant_group varchat(50)," +
            "FOREIGN KEY(id) REFERENCES users(id))";

    private String DROP_USER_TABLE = "DROP TABLE IF EXISTS etudiants";

    public EtudiantDatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_USER_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL(DROP_USER_TABLE);
        onCreate(db);
    }

    public void addEtudiant(Etudiant etudiant) {
        SQLiteDatabase db_read = this.getReadableDatabase();
        Cursor cursor = db_read.rawQuery("SELECT * FROM users WHERE email=? AND id=?", new String[]{etudiant.getEmail(), String.valueOf(etudiant.getId())});
        cursor.moveToFirst();

        SQLiteDatabase db = this.getWritableDatabase();
        if(cursor.getCount() > 0) {
            ContentValues valuesEtudiant = new ContentValues();
            valuesEtudiant.put("id", etudiant.getId());
            valuesEtudiant.put("specialty", etudiant.getSpecialty());
            valuesEtudiant.put("etudiant_group", etudiant.getGroup());
            db.insert("etudiants", null, valuesEtudiant);
            db.close();
        } else {
            ContentValues valuesUser = new ContentValues();
            ContentValues valuesEtudiant = new ContentValues();
            valuesUser.put("id", etudiant.getId());
            valuesUser.put("firstname", etudiant.getFirstname());
            valuesUser.put("lastname", etudiant.getLastname());
            valuesUser.put("email", etudiant.getEmail());
            valuesUser.put("password", etudiant.getPassword());
            db.insert("users", null, valuesUser);
            valuesEtudiant.put("id", etudiant.getId());
            valuesEtudiant.put("specialty", etudiant.getSpecialty());
            valuesEtudiant.put("etudiant_group", etudiant.getGroup());
            db.insert("etudiants", null, valuesEtudiant);
            db.close();
        }
    }

    public Etudiant getEtudiant(String email) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT users.*, etudiants.specialty, etudiants.etudiant_group FROM users, etudiants WHERE users.id = etudiants.id AND  email=?", new String[]{email});

        int userId;
        String userFirstname, userLastname, userEmail, userPassword, userRole;
        String userSpecialty, userGroup;

        if (cursor.getCount() > 0) {
            cursor.moveToFirst();
            userId = Integer.parseInt(cursor.getString(cursor.getColumnIndex("id")));
            userFirstname = cursor.getString(cursor.getColumnIndex("firstname"));
            userLastname = cursor.getString(cursor.getColumnIndex("lastname"));
            userEmail = cursor.getString(cursor.getColumnIndex("email"));
            userPassword = cursor.getString(cursor.getColumnIndex("password"));
            userRole = cursor.getString(cursor.getColumnIndex("role"));
            userSpecialty = cursor.getString(cursor.getColumnIndex("specialty"));
            userGroup = cursor.getString(cursor.getColumnIndex("etudiant_group"));
            return new Etudiant(userId, userFirstname, userLastname, userEmail, userPassword, userRole, userSpecialty, userGroup);
        }
        db.close();
        return null;
    }


}
