import React from 'react'
import { useState } from 'react';


const CreatePost = () => {


	// list of uploaded images from input
    let [uploadedImages, setUploadedImages] = useState<object[]>([])

	// processed image
    let [renderedImages, setRenderedImages] = useState<string[]>([])

	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			const newFiles = Array.from(target.files);

			// convert FileList to an array and merge with current state
			uploadedImages = [...uploadedImages, ...newFiles];

			// process each new file
			newFiles.forEach(processFile);
		}
	}

    const [bodyText, setBodyText] = useState("")

	// process file and add data url to renderedImage array
	function processFile(file: File) {
		const reader = new FileReader();

		reader.onload = (event) => {
			if (event.target?.result) {
				renderedImages = [...renderedImages, event.target.result as string];
			}
		};

		reader.readAsDataURL(file);
	}

	function deleteImage(index: number) {
		uploadedImages = uploadedImages.filter((_, i) => i !== index);
		renderedImages = renderedImages.filter((_, i) => i !== index);
	}

    const [counter, setCounter] = useState(false)


	async function submitNewPost(event: any) {
		event.preventDefault();

		const formData = new FormData();
		formData.append('body', body);

		uploadedImages.forEach((image, index) => {
			formData.append(`images`, image);
		});

		await axios
			.post('/api/posts', formData, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}

  return (
    <section className="border-2 h-fit p-4">
	<form className="flex flex-col gap-2" onSubmit={submitNewPost}>
		<div className="h-fit flex items-center relative">
			<textarea
				placeholder="What's on your mind?"
				aria-label="Create your post body"
				className={`w-full h-10 focus:outline-0 focus:h-52 ${bodyText.length > 0 && 'h-52'}  transition-all duration-150 leading-normal bg-base-300 rounded-lg py-2 px-6 resize-none overflow-hidden`}
				onChange={(e) => setBodyText(e.target.value)}
				onFocusCapture={() => (counter = !counter)}
			>
			</textarea>
			{#if counter}
				<p
					className={`absolute py-2 px-4 self-end ${body.length < 400 ? 'text-info' : 'text-error'} right-0`}
				>
					{body.length}/400
				</p>
			{/if}
		</div>

		{#if renderedImages}
			<div className="flex flex-row gap-4 overflow-y-none overflow-x-auto">
				{#each renderedImages as image, index}
					<div className="relative flex-none">
						<button
							type="button"
							aria-label="Remove image from post"
							className="absolute flex items-center justify-center bg-white cursor-pointer text-sm font-bold h-6 w-6 p-2 rounded-full top-4 right-4"
							onclick={() => deleteImage(index)}>X</button
						>
						<img src={image} alt="" className="h-50" />
					</div>
				{/each}
			</div>
		{/if}

		<div className="flex gap-4">
			<button
				type="submit"
				aria-label="Create Post"
				className="bg-neutral text-white py-2 px-6 rounded-lg cursor-pointer">Create Post</button
			>
			<input
				id="file-input"
				placeholder="Upload Image"
				type="file"
				accept="image/*"
				aria-label="Upload a selected image (Optional)"
				className="p-2 bg-base-300 rounded-lg cursor-pointer hidden"
				onchange={handleFileUpload}
			/>
			<button
				type="button"
				className="cursor-pointer bg-neutral rounded-lg w-12 flex justify-center items-center text-white"
				aria-label="Upload Image"
				onclick={() => document.getElementById('file-input')?.click()}
			>
				<svg
					width="25"
					height="25"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						x="3"
						y="7"
						width="18"
						height="12"
						rx="2"
						ry="2"
						stroke="white"
						stroke-width="1"
						fill="none"
					/>
					<circle cx="12" cy="13" r="4" stroke="white" stroke-width="1" fill="none" />
					<path d="M8 7L10 4H14L16 7" stroke="white" stroke-width="1" fill="none" />
				</svg>
			</button>
		</div>
	</form>
</section>

  )
}

export default CreatePost