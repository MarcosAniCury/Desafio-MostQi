﻿using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class UserCreateRequest
    {
        public enum EType
        {
            collaborator,
            client
        }

        public UserCreateRequest(string name, string password, string email, string type)
        {
            Name = name;
            Email = email;
            Password = password;
            Type = type;
        }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Name { get; private set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [EmailAddress(ErrorMessage = "O campo {0} não é um email válido")]
        public string Email { get; private set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(50, ErrorMessage = "O campo {0} deve ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; private set; }

        [EnumDataType(typeof(EType), ErrorMessage = "O campo {0} deve ser \"collaborator\" ou \"client\"")]
        public string Type { get; private set; }


    }
}
