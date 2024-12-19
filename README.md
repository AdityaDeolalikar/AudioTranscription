
# Whisper

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.


A Transformer sequence-to-sequence model is trained on various speech processing tasks, including multilingual speech recognition, speech translation, spoken language identification, and voice activity detection. These tasks are jointly represented as a sequence of tokens to be predicted by the decoder, allowing a single model to replace many stages of a traditional speech-processing pipeline. The multitask training format uses a set of special tokens that serve as task specifiers or classification targets.



## Setup

We used Python 3.9.9 and [PyTorch](https://pytorch.org/) 1.10.1 to train and test our models, but the codebase is expected to be compatible with Python 3.8-3.11 and recent PyTorch versions. The codebase also depends on a few Python packages, most notably [OpenAI's tiktoken](https://github.com/openai/tiktoken) for their fast tokenizer implementation. You can download and install (or update to)


### Setup Guide

1. **Install Python (Version 3.8 - 3.11)**  
   
      Download and install Python from the official website:  
      [Python Download](https://www.python.org/downloads/)

Check Version in your CLI:
```bash
python --version
```

2. **Upgrade pip**  

      Update pip to the latest version by running the following command in your CLI:
      ```bash
      # for windows
      python -m pip install --upgrade pip
      ```
      
Check Version in your CLI:
```bash
pip --version
```

3. **Install FFmpeg**
   
   FFmpeg is required for handling audio and video files.

   * Download FFmpeg from the [official website](https://ffmpeg.org//download.html).
   * After downloading, set up FFmpeg in your system's environment variables.
   * Or used commands:
   It also requires the command-line tool [`ffmpeg`](https://ffmpeg.org/) to be installed on your system, which is available from most package managers:

```bash
# on Ubuntu or Debian
sudo apt update && sudo apt install ffmpeg

# on Arch Linux
sudo pacman -S ffmpeg

# on MacOS using Homebrew (https://brew.sh/)
brew install ffmpeg

# on Windows using Chocolatey (https://chocolatey.org/)
choco install ffmpeg

# on Windows using Scoop (https://scoop.sh/)
scoop install ffmpeg
```


Check Version in your CLI:
```bash
ffmpeg --version
```

4. **Install PyTorch**
   
   Whisper uses PyTorch for its underlying machine learning capabilities. Install PyTorch from [PyTorch Download](https://pytorch.org/get-started/locally/).

* Follow the instructions based on your OS, CUDA version, and Python version.

Check Version in your CLI:
```bash
python

import torch
print(torch.__version__)
```

5. **Install Chocolatey** 

   Chocolatey is a package manager that helps with installation processes.

   * Run the following command :

   ```bash
   # For Windows (Powershell)
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1')
   
   # For macOS (Terminal)
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

   # For ubantu (Terminal)
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

Check Version in your CLI:
```bash
choco -v
```

6. **Install Anaconda**
    
   Anaconda can help manage your Python environment and dependencies.
* Download Anaconda from the [official website](https://www.anaconda.com/download).

7. **Install CUDA (Optional)**

   CUDA is optional but can accelerate processing if you have a compatible NVIDIA GPU.
* Download CUDA from [NVIDIA CUDA Downloads](https://developer.nvidia.com/cuda-downloads).

8. **Installation of Whisper**
   
   latest release of Whisper with the following command:
   ```bash
   pip install -U openai-whisper
   ```
Alternatively, the following command will pull and install the latest commit from this repository, along with its Python dependencies:

    pip install git+https://github.com/openai/whisper.git 

To update the package to the latest version of this repository, please run:

    pip install --upgrade --no-deps --force-reinstall git+https://github.com/openai/whisper.git
  
  ## Installation in Whisper
  
     Step 1: Open the folder:
  
  ![1](https://github.com/user-attachments/assets/6a3b495c-296a-4a5d-a012-412cbb3d80be)

     Step 2: Click on these:
  
  ![2](https://github.com/user-attachments/assets/992f5f14-b94c-4aa8-a9a1-25d468545632)

    Step 3: Type cmd and Enter
    
  ![3](https://github.com/user-attachments/assets/c4564707-12f0-4fac-a31e-4c5ad31c7f8e)

    Step 4: Type whisper 
  
  ![4](https://github.com/user-attachments/assets/9cf33e4a-7556-4995-a367-adfb5c9e1199)


    Stpe 5: Type whisper "filename.wav"
    
  ![5](https://github.com/user-attachments/assets/2b8bfcaa-2dbe-43ad-a746-e419ab7522e0)

  
