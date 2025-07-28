<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCandidateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $candidateId = $this->route('candidate')->id ?? $this->route('candidate');
        
        return [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'email',
                Rule::unique('candidates')->ignore($candidateId),
            ],
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date',
            'position_applied' => 'nullable|string|max:255',
            'experience_summary' => 'nullable|string|max:1000',
            'current_company' => 'nullable|string|max:255',
            'current_position' => 'nullable|string|max:255',
            'expected_salary' => 'nullable|numeric|min:0',
            'status' => 'sometimes|in:new,reviewed,shortlisted,interviewed,hired,rejected',
            'notes' => 'nullable|string|max:1000',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:10240', // 10MB max
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already registered.',
            'resume.file' => 'Please upload a valid file.',
            'resume.mimes' => 'Resume must be a PDF, DOC, or DOCX file.',
            'resume.max' => 'Resume file size must be less than 10MB.',
        ];
    }
}
