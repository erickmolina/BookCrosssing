--Consultas

CREATE PROCEDURE SP_CapturarLibro(IN idusuario INT, IN idlibro INT,IN name VARCHAR(255))
BEGIN
	INSERT INTO Lector(FK_Usuario,FK_Libro)VALUES(idusuario,idlibro);
	UPDATE Libro SET Estado='Atrapado', LectorActual=name WHERE IdLibro =idlibro;
END