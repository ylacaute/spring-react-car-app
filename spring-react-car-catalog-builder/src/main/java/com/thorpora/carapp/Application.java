package com.thorpora.carapp;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.StreamSupport;

public class Application {

	static boolean displayYaml = true;
	static boolean generateCatalog = true;

	static String PATH = "/home/epi/Prog/project/spring-react-car-app/spring-react-car-app-front/demo/static/cars/";
	static String OUTPUT_PATH = PATH + "catalog.yml";

	static YamlCarConfig yamlCarConfig = new YamlCarConfig("0.1");

	static List<String> excludedDir = Arrays.asList(
			"#NON CLASSE",
			"@eaDir",
			"#EN ATTENTE"
	);

	public static void main(String[] args) throws IOException {
		Files.newDirectoryStream(Paths.get(PATH))
				.iterator()
				.forEachRemaining(f -> {
					if (isDirectoryNotExcluded(f)) {
						try {
							processBrand(f);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				});
		String finalYaml = yamlCarConfig.toYaml();
		if (displayYaml) {
			System.out.println(finalYaml);
		}
		if (generateCatalog) {
			BufferedWriter writer = new BufferedWriter(new FileWriter(OUTPUT_PATH));
			writer.write(finalYaml);
			writer.close();
		}
	}

	private static void processBrand(Path file) throws IOException {
		String brandName = file.getFileName().toString();
		System.out.println("Processing brand : " + brandName);
		yamlCarConfig.addBrand(brandName);
		Files.newDirectoryStream(file)
				.iterator()
				.forEachRemaining(f -> {
					if (isDirectoryNotExcluded(f)) {
						try {
							processBox(brandName, f);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				});
	}

	private static void processBox(String brandName, Path file) throws IOException {
		String boxName = file.getFileName().toString();
		System.out.println(" Processing box : " + boxName);
		Files.newDirectoryStream(file)
				.iterator()
				.forEachRemaining(f -> {
					if (isDirectoryNotExcluded(f)) {
						try {
							processCar(brandName, boxName, f);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				});
	}

	private static void processCar(String brandName, String boxName, Path file) throws IOException {
		String carName = file.getFileName().toString();
		System.out.println("  Processing car : " + carName);
		yamlCarConfig.addProduct(brandName, boxName, carName, countImages(file));
	}

	private static long countImages(Path file) throws IOException {
		try (DirectoryStream<Path> ds = Files.newDirectoryStream(file)) {
			return StreamSupport.stream(ds.spliterator(), false)
				.filter(Application::isFileNotExcluded)
				.filter(Application::isExtJpg)
				.count();
		}
	}

	private static boolean isFileNotExcluded(Path f) {
		return !excludedDir.contains(f.getFileName().toString()) && f.toFile().isFile();
	}

	private static boolean isExtJpg(Path f) {
		String filename = f.getFileName().toString();
		String ext = filename.substring(filename.lastIndexOf('.') + 1);
		return ext.equalsIgnoreCase("jpg");
	}

	private static boolean isDirectoryNotExcluded(Path f) {
		return !excludedDir.contains(f.getFileName().toString()) && f.toFile().isDirectory();
	}

}
