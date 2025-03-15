export function fieldsFilter(data, importantFields) {
  const result = Object.fromEntries(
    Object.entries(data).filter((e) => importantFields.includes(e[0]))
  );
  return result;
}

export function spacesToNumbers(value) {
  // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  if (!value) return;
  var parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export function getToken() {
  return JSON.parse(sessionStorage.getItem("accessToken")) || "";
}

export function setSessionToken(token = "") {
  sessionStorage.setItem("accessToken", token);
}

export function getStorageItem(item) {
  return JSON.parse(localStorage.getItem(item)) || [];
}

export function setStorageItem(item, value) {
  localStorage.setItem(item, JSON.stringify(value));
}

export function descendingCompare(a, b) {
  if (a.playedTime < b.playedTime) {
    return 1;
  }
  if (a.playedTime > b.playedTime) {
    return -1;
  }
  return 0;
}

export function objectSort(field, sortDirection = 1) {
  return function (a, b) {
    if (Array.isArray(field)) {
      if (a[field[0]][field[1]] < b[field[0]][field[1]]) {
        return sortDirection;
      }
      if (a[field[0]][field[1]] > b[field[0]][field[1]]) {
        return -sortDirection;
      }
      return 0;
    }
    if (a[field] < b[field]) {
      return sortDirection;
    }
    if (a[field] > b[field]) {
      return -sortDirection;
    }
    return 0;
  };
}

export const releaseToLocale = (data) => {
  if (!data) return "In Development";

  const release = new Date(data.original_release_date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return release.toLocaleDateString("ru-RU", options);
};

export const unifyFields = (data) => {
  return {
    name: data.name,
    year: data.year || data.original_release_date || data.expected_release_year,
    enName: data.enName || data.alternativeName,
    description: data.description || data.deck,
    logo:
      data.logo?.url ||
      data.poster?.previewUrl ||
      data.poster?.url ||
      data.image?.icon_url,
    genres: data.genres?.map((e) => e.name),
    id: data.id,
    api_detail_url: data.api_detail_url,
    platforms: data.platforms,
    rating: data.rating?.kp ? Number(data.rating?.kp).toFixed(2) : "",
  };
};

export const setRequestOptions = (body) => {
  return {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.accessToken ?? ""}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  };
};

export const processImage = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // First canvas for cropping
      const cropCanvas = document.createElement("canvas");
      const cropCtx = cropCanvas.getContext("2d");

      // Calculate dimensions for square crop
      const size = Math.min(img.width, img.height);
      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;

      // Set crop canvas size to the square size
      cropCanvas.width = size;
      cropCanvas.height = size;

      // Draw cropped image
      cropCtx.drawImage(img, x, y, size, size, 0, 0, size, size);

      // Second canvas for resizing
      const resizeCanvas = document.createElement("canvas");
      const resizeCtx = resizeCanvas.getContext("2d");

      // Set final dimensions
      const finalSize = 100;
      resizeCanvas.width = finalSize;
      resizeCanvas.height = finalSize;

      // Enable smooth resizing
      resizeCtx.imageSmoothingEnabled = true;
      resizeCtx.imageSmoothingQuality = "high";

      // Draw resized image
      resizeCtx.drawImage(cropCanvas, 0, 0, finalSize, finalSize);

      // Convert to blob
      resizeCanvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        file.type,
        0.9
      ); // 0.9 is quality parameter

      URL.revokeObjectURL(img.src);
    };
  });
};

export const bufferToBase64Url = (avatar) => {
  if (!avatar || !avatar.data || !avatar.contentType) {
    return null;
  }

  try {
    const bytes = new Uint8Array(avatar.data.data);
    let binary = "";
    const chunk = 8192;

    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }

    return `data:${avatar.contentType};base64,${btoa(binary)}`;
  } catch (error) {
    console.error("Error converting avatar:", error);
    return null;
  }
};

// TODO Need to complete
export const inputDateformatter = (value, prevValue = "") => {
  if (prevValue && value.length < prevValue.length) {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly;
  }

  const digitsOnly = value.replace(/\D/g, "");

  let formattedDate = digitsOnly;
  if (digitsOnly.length >= 4) {
    formattedDate = digitsOnly.slice(0, 4) + "-" + digitsOnly.slice(4);
  }
  if (digitsOnly.length >= 6) {
    formattedDate = formattedDate.slice(0, 7) + "-" + formattedDate.slice(7);
  }

  return formattedDate.slice(0, 10);
};

export const inputPhoneFormatter = (value, prevValue = "") => {
  if (prevValue && value.length < prevValue.length) {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly;
  }

  const digitsOnly = value.replace(/\D/g, "");
  let formattedPhone = digitsOnly;

  if (digitsOnly.length >= 3) {
    formattedPhone = digitsOnly.slice(0, 3) + "-" + digitsOnly.slice(3);
  }
  if (digitsOnly.length >= 5) {
    formattedPhone = formattedPhone.slice(0, 7) + "-" + formattedPhone.slice(7);
  }

  return formattedPhone.slice(0, 12);
};

export const minToHour = (min) => min && `${Math.floor(min / 60)}:${min % 60}`;
