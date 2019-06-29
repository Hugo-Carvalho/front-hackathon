<?php 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILE['file'])) {
        $errors = [];
        $path = '/';
		$extensions = ['csv'];

		$file_name = $_FILE['file']['name'];
		$file_tmp = $_FILE['file']['tmp_name'];
		$file_type = $_FILE['file']['type'];
		$file_ext = strtolower(end(explode('.', $_FILE['file']['name'])));

		$file = $path . $file_name;

		if ($file_ext != $extensions)) {
			$errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
		}

		if (empty($errors)) {
			return $file;
		}

		if ($errors) print_r($errors);
    }
}
