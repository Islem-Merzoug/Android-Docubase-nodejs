package com.findriver.docubase.Models;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.findriver.docubase.Class.Etudiant;
import com.findriver.docubase.Class.User;

public class UserDatabaseHelper extends SQLiteOpenHelper {

    private static final int DATABASE_VERSION = 2;
    private static final String DATABASE_NAME = "docubase";

    private String CREATE_USER_TABLE = "CREATE TABLE users (" +
            "id INTEGER PRIMARY KEY," +
            "firstname VARCHAR(50)," +
            "lastname VARCHAR(50)," +
            "email VARCHAR(50) UNIQUE," +
            "password VARCHAR(50)," +
            "role VARCHAR(50) )";

    private String DROP_USER_TABLE = "DROP TABLE IF EXISTS users";

    public UserDatabaseHelper(Context context) {
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

    public void addUser( User user) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("id", user.getId());
        values.put("firstname", user.getFirstname());
        values.put("lastname", user.getLastname());
        values.put("email", user.getEmail());
        values.put("password", user.getPassword());
        values.put("role", user.getRole());
        db.insert("users", null, values);
        db.close();
    }

    public boolean checkUser(String email, String password) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM users WHERE email=? AND password=?", new String[]{email, password});
        if (cursor.getCount() > 0) return true;
        else return false;
    }

    public String checkRole(String email) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM users WHERE email=?", new String[]{email});
        cursor.moveToFirst();
        if (cursor.getString(cursor.getColumnIndex("role")).equals("Etudiant")) return "Etudiant";
        if (cursor.getString(cursor.getColumnIndex("role")).equals("Enseignant")) return "Enseignant";
        if (cursor.getString(cursor.getColumnIndex("role")).equals("Administrateur")) return "Administrateur";
        return "Etudiant";
    }

    public User getUser(String email) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM users WHERE email=?", new String[]{email});

        int userId;
        String userFirstname, userLastname, userEmail, userPassword, userRole;

        if (cursor.getCount() > 0) {
            cursor.moveToFirst();
            userId = Integer.parseInt(cursor.getString(cursor.getColumnIndex("id")));
            userFirstname = cursor.getString(cursor.getColumnIndex("firstname"));
            userLastname = cursor.getString(cursor.getColumnIndex("lastname"));
            userEmail = cursor.getString(cursor.getColumnIndex("email"));
            userPassword = cursor.getString(cursor.getColumnIndex("password"));
            userRole = cursor.getString(cursor.getColumnIndex("role"));
            return new User(userId, userFirstname, userLastname, userEmail, userPassword, userRole);
        }
        db.close();
        return null;
    }
}