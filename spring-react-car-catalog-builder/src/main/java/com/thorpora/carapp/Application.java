package com.thorpora.carapp;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static java.lang.System.out;

public class Application {

	static boolean displayYaml = true;
	static boolean generateCatalog = true;
	static boolean renameImages = false;

	static String PATH = "/static/cars";
	static String OUTPUT_PATH = PATH +"/catalog.yml";

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
			out.println("\nGenerated YAML:\n" + finalYaml);
		}
		if (generateCatalog) {
			BufferedWriter writer = new BufferedWriter(new FileWriter(OUTPUT_PATH));
			writer.write(finalYaml);
			writer.close();
			out.println("File write successfully");
		}
	}

	private static void processBrand(Path file) throws IOException {
		String brandName = file.getFileName().toString();
		out.println("Processing brand : " + brandName);
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
		out.println(" Processing box : " + boxName);
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
		out.println("  Processing car : " + carName);
		yamlCarConfig.addProduct(brandName, boxName, carName, processImages(file));


	}

	// Return image count
	private static long processImages(Path file) throws IOException {
		List<File> images = Arrays.stream(file.toFile().listFiles()).sorted().collect(Collectors.toList());
		for (int i = 0; i < images.size(); i++) {
			Path currentImgPath = images.get(i).toPath();

			if (images.get(i).toPath().getFileName().toString().equals("info.jpg") ){
				out.println("    info.jpg exist, skip. ");
				continue;
			}
			if (images.get(i).toPath().getFileName().toString().equals("featured.jpg") ){
				out.println("    featured.jpg exist, skip. ");
				continue;
			}
			out.println("    Renaming " + currentImgPath.getFileName() + " to " + (i+1) + ".jpg");
			if (renameImages) {
				Files.move(currentImgPath, currentImgPath.resolveSibling((i+1) + ".jpg"));
			}

//			if (i == 0) {
//				out.println("    Renaming " + currentImgPath.getFileName() + " to info.jpg");
//				//Files.move(currentImgPath, currentImgPath.resolveSibling("info.jpg"));
//			} else if (i != images.size() - 1) {
//				out.println("    Renaming " + currentImgPath.getFileName() + " to " + (i+1) + ".jpg");
//			}
			//out.println("    Renaming " + currentImgPath.getFileName() + " to " + (i+1) + ".jpg");


		}

		// Rename images


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
