DECLARE @CreatedEmployees BIT = 0;

IF OBJECT_ID(N'dbo.Employees', N'U') IS NULL
BEGIN
	CREATE TABLE dbo.Employees (
		EmployeeID INT PRIMARY KEY,
		FirstName VARCHAR(50),
		LastName VARCHAR(50),
		BirthDate DATE,
		Phone VARCHAR(20)
	);
	SET @CreatedEmployees = 1;
END
ELSE
BEGIN
	PRINT 'dbo.Employees already exists; skipping DROP to protect existing data.';
END;

IF @CreatedEmployees = 1 AND OBJECT_ID(N'dbo.Employees', N'U') IS NOT NULL
BEGIN
	DROP TABLE dbo.Employees;
END;