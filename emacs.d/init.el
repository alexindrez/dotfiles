;; -*- mode: elisp -*-

;; load path
(add-to-list 'load-path "~/.emacs.d/lisp/")

;; load packages
(require 'package)
(add-to-list 'package-archives
             '("melpa-stable" . "http://stable.melpa.org/packages/") t)
(when (< emacs-major-version 24)
  (add-to-list 'package-archives '("gnu" . "http://elpa.gnu.org/packages/")))
(package-initialize)

(load "better-defaults")

;; disable splash screen (re-enable with o)
(setq inhibit-splash-screen t)

;; enable transient mark mode
(transient-mark-mode 1)

;;;; ORG MODE
;; enable org-mode
(require 'org)

;; make org-mode work with .org extensions
;; (add-to-list 'auto-mode-alist '("\\.org$" . org-mode))
;; ^ is default in recent emacsen

;; david o'toole's org tutorial configuration
(define-key global-map "\C-cl" 'org-store-link)
(define-key global-map "\C-ca" 'org-agenda)
(setq org-log-done t)

;;;; EVIL MODE
;;(push "~/.emacs.d/evil" 'load-path)
;;(require 'evil)
;;(evil-mode 1)
  
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(custom-enabled-themes (quote (solarized-dark)))
 '(custom-safe-themes (quote ("8aebf25556399b58091e533e455dd50a6a9cba958cc4ebb0aab175863c25b9a4" "1dec44213e780f4220cab0b45ae60063a1fecfa26a678ccce07fca4b30b92dc5" default))))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )