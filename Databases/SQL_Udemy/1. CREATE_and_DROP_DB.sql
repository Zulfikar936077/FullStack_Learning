USE master;

DECLARE @CreatedTrainingDB BIT = 0;

IF DB_ID(N'TrainingDB') IS NULL
BEGIN
	EXEC(N'CREATE DATABASE TrainingDB;');
	SET @CreatedTrainingDB = 1;
END
ELSE
BEGIN
	PRINT 'TrainingDB already exists; skipping DROP to protect existing data.';
END;

IF @CreatedTrainingDB = 1 AND DB_ID(N'TrainingDB') IS NOT NULL
BEGIN
	ALTER DATABASE TrainingDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
	DROP DATABASE TrainingDB;
END;