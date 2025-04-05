Coding Challenge: Fitness Tracker API
Objective
Create an API using an Express server to manage users fitness activities with calorie tracking and workout categorization.

Requirements
CRUD Operations
Implement the following operations for fitness activities:

Log a new workout
Retrieve a user's workout history
Update a workout (only within 24 hours of logging)
Delete a workout
Workout Structure
Each workout should have the following fields:

date (timestamp) – Required
type (enum: "Cardio", "Strength", "Flexibility", "Endurance") – Required
duration (number, minutes) – Required, must be between 5 and 300 minutes
caloriesBurned (number) – Required, must be between 10 and 2000
notes (string) – Optional
Search & Filtering
Allow users to search workouts by date range, but cannot request more than 3 months at a time
Allow users to sort workouts by calories burned or duration
Validation
Prevent duplicate workouts on the same date for the same type
Database
Use MongoDB to store workouts
